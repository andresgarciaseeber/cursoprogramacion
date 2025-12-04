/**
 * Servicio API para el Sistema de Evaluación de Proyectos Musicales
 * Conecta con el backend PHP
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost/proyectos-musicales';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Proyectos
  async getProyectos(filtros = {}) {
    const params = new URLSearchParams();
    params.append('action', 'proyectos');
    if (filtros.nombre) params.append('nombre', filtros.nombre);
    if (filtros.destino) params.append('destino', filtros.destino);
    if (filtros.rubros) params.append('rubros', filtros.rubros);

    const response = await this.client.get(`/api.php?${params}`);
    return response.data;
  }

  async getProyecto(id) {
    const proyectos = await this.getProyectos();
    return proyectos.find(p => p.id === id);
  }

  // Criterios de evaluación
  async getCriterios() {
    const response = await this.client.get('/api.php?action=criterios');
    return response.data;
  }

  // Evaluaciones
  async guardarEvaluacion(data) {
    const response = await this.client.post('/api.php?action=evaluar', data);
    return response.data;
  }

  async getEvaluaciones(proyectoId) {
    const response = await this.client.get(`/api.php?action=evaluaciones&proyecto_id=${proyectoId}`);
    return response.data;
  }

  // Ranking
  async getRanking(limit = 50) {
    const response = await this.client.get(`/api.php?action=ranking&limit=${limit}`);
    return response.data;
  }
}

export default new ApiService();
