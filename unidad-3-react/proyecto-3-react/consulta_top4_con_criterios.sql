-- Consulta TOP 4 con detalle de cada criterio (una fila por criterio)
-- Útil para análisis detallado de por qué ganó cada proyecto

SELECT 
    pm.id as id_proyecto,
    pm.proyecto_musical as nombre_proyecto,
    pm.nombre as nombre_apellido_titular,
    pm.dni,
    
    -- Información del criterio
    ce.nombre as criterio,
    ce.peso as peso_criterio,
    e.puntaje as puntaje_asignado,
    ROUND(e.puntaje * ce.peso, 2) as puntaje_ponderado,
    e.comentario,
    
    -- Totales del proyecto
    ROUND(rp.puntaje_base, 2) as puntaje_base_total,
    ROUND(rp.ajuste_historial, 2) as ajuste_historial,
    ROUND(rp.puntaje_final, 2) as puntaje_final,
    
    -- Ranking position
    (SELECT COUNT(*) + 1 
     FROM ranking_proyectos rp2 
     WHERE rp2.puntaje_final > rp.puntaje_final 
       AND rp2.estado_evaluacion = 'Completo'
    ) as posicion

FROM ranking_proyectos rp
INNER JOIN proyectos_musicales pm ON rp.id = pm.id
LEFT JOIN evaluaciones e ON pm.id = e.proyecto_id
LEFT JOIN criterios_evaluacion ce ON e.criterio_id = ce.id AND ce.activo = 1

WHERE rp.estado_evaluacion = 'Completo'
  AND (SELECT COUNT(*) + 1 
       FROM ranking_proyectos rp3 
       WHERE rp3.puntaje_final > rp.puntaje_final 
         AND rp3.estado_evaluacion = 'Completo'
      ) <= 4

ORDER BY rp.puntaje_final DESC, ce.orden_display;
