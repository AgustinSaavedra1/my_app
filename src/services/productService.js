// src/services/productService.js

// Función principal para buscar productos
export const searchProduct = async (barcode) => {
    try {
      // Intentar primero con Open Food Facts (API gratuita)
      const openFoodResponse = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const openFoodData = await openFoodResponse.json();
  
      if (openFoodData.status === 1) {
        return {
          success: true,
          source: 'OpenFoodFacts',
          data: {
            name: openFoodData.product.product_name || 'Nombre no disponible',
            brand: openFoodData.product.brands || 'Marca no disponible',
            image: openFoodData.product.image_url,
            ingredients: openFoodData.product.ingredients_text,
            nutritionFacts: openFoodData.product.nutriments,
            packaging: openFoodData.product.packaging,
            categories: openFoodData.product.categories,
            ecoScore: openFoodData.product.ecoscore_grade,
            recyclableStatus: determineRecyclableStatus(openFoodData.product)
          }
        };
      }
  
      // Si no se encuentra el producto, devolver error
      return {
        success: false,
        error: 'Producto no encontrado en la base de datos'
      };
  
    } catch (error) {
      console.error('Error buscando el producto:', error);
      return {
        success: false,
        error: 'Error al buscar el producto'
      };
    }
  };
  
  // Función auxiliar para determinar el estado de reciclaje
  const determineRecyclableStatus = (product) => {
    const packaging = (product.packaging || '').toLowerCase();
    const materialInfo = getMaterialInfo(packaging);
  
    // Si no hay información de empaque, dar información genérica
    if (!packaging) {
      return {
        status: 'unknown',
        type: 'unknown',
        instructions: 'Verificar material en el empaque',
        ecoTips: [
          'Revisa los símbolos de reciclaje en el producto',
          'Separa los diferentes materiales antes de reciclar',
          'Consulta las normas locales de reciclaje'
        ]
      };
    }
  
    return materialInfo;
  };
  
  // Función para determinar información específica del material
  const getMaterialInfo = (packaging) => {
    // Plástico
    if (packaging.includes('plastic') || packaging.includes('plástico') || 
        packaging.includes('pet') || packaging.includes('hdpe') || 
        packaging.includes('pvc') || packaging.includes('ldpe')) {
      return {
        status: 'recyclable',
        type: 'plastic',
        instructions: 'Depositar en contenedor amarillo',
        ecoTips: [
          'Enjuagar antes de reciclar',
          'Quitar etiquetas si es posible',
          'Aplastar para reducir volumen',
          'Verificar el número de reciclaje en el fondo'
        ]
      };
    }
  
    // Vidrio
    if (packaging.includes('glass') || packaging.includes('vidrio')) {
      return {
        status: 'recyclable',
        type: 'glass',
        instructions: 'Depositar en contenedor verde',
        ecoTips: [
          'No es necesario quitar etiquetas',
          'Enjuagar antes de reciclar',
          'No romper el vidrio',
          'Quitar tapas metálicas'
        ]
      };
    }
  
    // Papel o cartón
    if (packaging.includes('paper') || packaging.includes('cardboard') || 
        packaging.includes('papel') || packaging.includes('cartón')) {
      return {
        status: 'recyclable',
        type: 'paper',
        instructions: 'Depositar en contenedor azul',
        ecoTips: [
          'Plegar para reducir volumen',
          'Retirar cintas adhesivas',
          'Asegurarse de que esté limpio y seco',
          'Separar elementos no papeleros'
        ]
      };
    }
  
    // Metal
    if (packaging.includes('metal') || packaging.includes('aluminium') || 
        packaging.includes('aluminum') || packaging.includes('tin') || 
        packaging.includes('steel') || packaging.includes('lata')) {
      return {
        status: 'recyclable',
        type: 'metal',
        instructions: 'Depositar en contenedor amarillo',
        ecoTips: [
          'Enjuagar antes de reciclar',
          'Aplastar para ahorrar espacio',
          'No es necesario quitar etiquetas',
          'Separar tapas si son de otro material'
        ]
      };
    }
  
    // Tetra Pak o envases compuestos
    if (packaging.includes('tetra') || packaging.includes('composite') || 
        packaging.includes('brik') || packaging.includes('compuesto')) {
      return {
        status: 'recyclable',
        type: 'composite',
        instructions: 'Depositar en contenedor amarillo',
        ecoTips: [
          'Enjuagar y escurrir bien',
          'Aplastar para reducir volumen',
          'No separar los materiales',
          'Plegar siguiendo las líneas marcadas'
        ]
      };
    }
  
    // Si no se puede determinar el material específico
    return {
      status: 'check',
      type: 'mixed',
      instructions: 'Verificar símbolos de reciclaje en el envase',
      ecoTips: [
        'Separar diferentes materiales',
        'Consultar normativa local',
        'En caso de duda, consultar con el punto limpio',
        'Intentar reutilizar si es posible'
      ]
    };
  };
  
  // Función para analizar información nutricional (si se necesita)
  export const analyzeNutrition = (nutritionFacts) => {
    if (!nutritionFacts) return null;
  
    const analysis = {
      hasHighSugar: nutritionFacts.sugars_100g > 22.5,
      hasHighSalt: nutritionFacts.salt_100g > 1.5,
      hasHighFat: nutritionFacts.fat_100g > 17.5,
      isHealthy: false,
      nutritionalScore: 0
    };
  
    // Calcular score nutricional básico
    let score = 0;
    if (!analysis.hasHighSugar) score += 1;
    if (!analysis.hasHighSalt) score += 1;
    if (!analysis.hasHighFat) score += 1;
    if (nutritionFacts.fiber_100g > 3) score += 1;
    if (nutritionFacts.proteins_100g > 8) score += 1;
  
    analysis.nutritionalScore = score;
    analysis.isHealthy = score >= 3;
  
    return analysis;
  };