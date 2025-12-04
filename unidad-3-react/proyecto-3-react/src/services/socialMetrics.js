/**
 * Servicio de Métricas de Redes Sociales y Plataformas Musicales
 * Extrae información de YouTube, Spotify, Instagram, etc.
 */

class SocialMetricsService {
  constructor() {
    // APIs públicas (algunas requieren claves, otras usan scraping ético)
    this.corsProxy = 'https://api.allorigins.win/raw?url=';
  }

  /**
   * Extrae ID de video de YouTube desde URL
   */
  extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  /**
   * Extrae ID de artista/track de Spotify
   */
  extractSpotifyId(url) {
    const match = url.match(/spotify\.com\/(artist|track|album)\/([a-zA-Z0-9]+)/);
    if (match) {
      return { type: match[1], id: match[2] };
    }
    return null;
  }

  /**
   * Obtiene estadísticas básicas de YouTube (usando oEmbed API - no requiere key)
   */
  async getYouTubeStats(url) {
    try {
      const videoId = this.extractYouTubeId(url);
      if (!videoId) return null;

      // Usar oEmbed API (pública, sin autenticación)
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);

      if (!response.ok) return null;

      const data = await response.json();

      return {
        platform: 'YouTube',
        title: data.title,
        author: data.author_name,
        thumbnail: data.thumbnail_url,
        videoId: videoId,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        // Nota: views, likes, etc. requieren YouTube Data API v3 con key
        hasDetailedStats: false
      };
    } catch (error) {
      console.error('Error obteniendo stats de YouTube:', error);
      return null;
    }
  }

  /**
   * Obtiene información de Spotify (requiere scraping o API oficial)
   * Versión básica usando scraping del HTML público
   */
  async getSpotifyStats(url) {
    try {
      const spotifyData = this.extractSpotifyId(url);
      if (!spotifyData) return null;

      // Información básica que podemos obtener
      return {
        platform: 'Spotify',
        type: spotifyData.type,
        id: spotifyData.id,
        url: url,
        // Nota: Para obtener oyentes mensuales necesitarías:
        // 1. Spotify Web API (requiere client_id y client_secret)
        // 2. O usar un servicio de terceros como Spotify Charts
        hasDetailedStats: false,
        note: 'Requiere API key de Spotify para estadísticas detalladas'
      };
    } catch (error) {
      console.error('Error obteniendo stats de Spotify:', error);
      return null;
    }
  }

  /**
   * Obtiene información de SoundCloud
   */
  async getSoundCloudStats(url) {
    try {
      // SoundCloud oEmbed API
      const response = await fetch(`https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`);

      if (!response.ok) return null;

      const data = await response.json();

      return {
        platform: 'SoundCloud',
        title: data.title,
        author: data.author_name,
        thumbnail: data.thumbnail_url,
        description: data.description,
        url: url,
        hasDetailedStats: true
      };
    } catch (error) {
      console.error('Error obteniendo stats de SoundCloud:', error);
      return null;
    }
  }

  /**
   * Analiza un enlace y obtiene las métricas disponibles
   */
  async analyzeLink(url) {
    if (!url) return null;

    const urlLower = url.toLowerCase();

    try {
      // YouTube
      if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
        return await this.getYouTubeStats(url);
      }

      // Spotify
      if (urlLower.includes('spotify.com')) {
        return await this.getSpotifyStats(url);
      }

      // SoundCloud
      if (urlLower.includes('soundcloud.com')) {
        return await this.getSoundCloudStats(url);
      }

      // Instagram (requiere API de Facebook/Instagram)
      if (urlLower.includes('instagram.com')) {
        const username = url.match(/instagram\.com\/([^/?]+)/)?.[1];
        return {
          platform: 'Instagram',
          username: username,
          url: url,
          hasDetailedStats: false,
          note: 'Requiere Instagram Graph API para estadísticas'
        };
      }

      return null;
    } catch (error) {
      console.error('Error analizando enlace:', error);
      return null;
    }
  }

  /**
   * Analiza múltiples enlaces
   */
  async analyzeMultipleLinks(links) {
    const validLinks = links.filter(link => link && link.trim());
    const results = await Promise.allSettled(
      validLinks.map(link => this.analyzeLink(link))
    );

    return results
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => result.value);
  }

  /**
   * Simula métricas basadas en el análisis de TensorFlow (audiencia de eventos)
   * Esto combina el análisis de imágenes con estimaciones de alcance
   */
  estimateReachFromAudience(audienceCount) {
    if (audienceCount === 0) {
      return {
        estimatedFollowers: '< 1K',
        estimatedMonthlyListeners: '< 500',
        tier: 'Emergente'
      };
    }

    if (audienceCount < 50) {
      return {
        estimatedFollowers: '1K - 5K',
        estimatedMonthlyListeners: '500 - 2K',
        tier: 'Local'
      };
    }

    if (audienceCount < 200) {
      return {
        estimatedFollowers: '5K - 20K',
        estimatedMonthlyListeners: '2K - 10K',
        tier: 'Regional'
      };
    }

    if (audienceCount < 500) {
      return {
        estimatedFollowers: '20K - 100K',
        estimatedMonthlyListeners: '10K - 50K',
        tier: 'Nacional'
      };
    }

    return {
      estimatedFollowers: '100K+',
      estimatedMonthlyListeners: '50K+',
      tier: 'Masivo'
    };
  }

  /**
   * Genera un score de presencia digital (0-100)
   */
  calculateDigitalPresenceScore(metrics) {
    let score = 0;
    const weights = {
      hasYouTube: 15,
      hasSpotify: 20,
      hasSoundCloud: 10,
      hasInstagram: 15,
      hasMultiplePlatforms: 20,
      hasVerifiedInfo: 20
    };

    const platforms = metrics.filter(m => m).length;

    if (metrics.some(m => m?.platform === 'YouTube')) score += weights.hasYouTube;
    if (metrics.some(m => m?.platform === 'Spotify')) score += weights.hasSpotify;
    if (metrics.some(m => m?.platform === 'SoundCloud')) score += weights.hasSoundCloud;
    if (metrics.some(m => m?.platform === 'Instagram')) score += weights.hasInstagram;
    if (platforms > 2) score += weights.hasMultiplePlatforms;
    if (metrics.some(m => m?.hasDetailedStats)) score += weights.hasVerifiedInfo;

    return Math.min(score, 100);
  }
}

export default new SocialMetricsService();
