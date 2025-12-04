/**
 * Servicio de Análisis de Imágenes con TensorFlow.js
 * Detecta audiencia en fotos de eventos musicales
 */

import * as cocoSsd from '@tensorflow-models/coco-ssd';

class ImageAnalysisService {
  constructor() {
    this.model = null;
    this.isLoading = false;
  }

  async loadModel() {
    if (this.model) return this.model;
    if (this.isLoading) {
      // Esperar a que termine de cargar
      while (this.isLoading) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return this.model;
    }

    this.isLoading = true;
    try {
      console.log('Cargando modelo COCO-SSD...');
      this.model = await cocoSsd.load();
      console.log('Modelo cargado exitosamente');
      return this.model;
    } catch (error) {
      console.error('Error cargando modelo:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async analyzeImage(imageElement) {
    const model = await this.loadModel();
    const predictions = await model.detect(imageElement);
    return predictions;
  }

  async countAudience(imageElement) {
    const predictions = await this.analyzeImage(imageElement);

    // Contar personas detectadas
    const people = predictions.filter(pred => pred.class === 'person');

    return {
      totalPeople: people.length,
      predictions: people,
      allDetections: predictions,
      audienceLevel: this.getAudienceLevel(people.length)
    };
  }

  getAudienceLevel(count) {
    if (count === 0) return { level: 'Sin datos', score: 0, color: '#999' };
    if (count < 10) return { level: 'Pequeño', score: 1, color: '#f39c12' };
    if (count < 30) return { level: 'Moderado', score: 2, color: '#3498db' };
    if (count < 50) return { level: 'Grande', score: 3, color: '#2ecc71' };
    return { level: 'Masivo', score: 4, color: '#e74c3c' };
  }

  async analyzeMultipleImages(imageElements) {
    const results = await Promise.all(
      imageElements.map(img => this.countAudience(img))
    );

    const totalPeople = results.reduce((sum, r) => sum + r.totalPeople, 0);
    const avgPeople = totalPeople / results.length;

    return {
      results,
      totalPeople,
      avgPeople,
      audienceLevel: this.getAudienceLevel(Math.round(avgPeople))
    };
  }
}

export default new ImageAnalysisService();
