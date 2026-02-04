-- Consulta detallada de los TOP 4 proyectos con justificación de puntajes
-- Esta consulta te da toda la información necesaria para redactar el informe

SELECT 
    -- Datos del proyecto
    pm.id as id_proyecto,
    pm.proyecto_musical as nombre_proyecto,
    pm.nombre as nombre_apellido_titular,
    pm.dni,
    pm.ciudad,
    pm.provincia,
    pm.genero_musical,
    
    -- Puntajes del ranking
    rp.puntaje_base,
    rp.ajuste_historial,
    rp.puntaje_final,
    rp.veces_presentado,
    rp.veces_ganador,
    
    -- Desglose detallado por criterio
    GROUP_CONCAT(
        CONCAT(
            ce.nombre, ': ', 
            e.puntaje, ' pts (peso ', ce.peso, 'x = ', 
            ROUND(e.puntaje * ce.peso, 2), ' pts)'
        ) 
        ORDER BY ce.orden_display 
        SEPARATOR ' | '
    ) as desglose_criterios,
    
    -- Promedio sin peso para referencia
    ROUND(AVG(e.puntaje), 2) as promedio_sin_peso,
    
    -- Justificación automática
    CONCAT(
        'El proyecto "', pm.proyecto_musical, '" de ', pm.nombre, 
        ' obtuvo un puntaje final de ', ROUND(rp.puntaje_final, 2), ' puntos. ',
        'El puntaje base de evaluación fue ', ROUND(rp.puntaje_base, 2), ' puntos ',
        CASE 
            WHEN rp.ajuste_historial > 0 THEN 
                CONCAT('con un ajuste positivo de +', ROUND(rp.ajuste_historial, 2), ' puntos ')
            WHEN rp.ajuste_historial < 0 THEN 
                CONCAT('con un ajuste de ', ROUND(rp.ajuste_historial, 2), ' puntos ')
            ELSE 'sin ajuste '
        END,
        'por historial de participaciones (',
        rp.veces_presentado, ' presentaciones previas, ',
        rp.veces_ganador, ' premios ganados). ',
        'Ubicación: ', pm.ciudad, ', ', pm.provincia, '. ',
        'Género musical: ', pm.genero_musical, '.'
    ) as justificacion_automatica

FROM ranking_proyectos rp
INNER JOIN proyectos_musicales pm ON rp.id = pm.id
LEFT JOIN evaluaciones e ON pm.id = e.proyecto_id
LEFT JOIN criterios_evaluacion ce ON e.criterio_id = ce.id AND ce.activo = 1

WHERE rp.estado_evaluacion = 'Completo'

GROUP BY pm.id

ORDER BY rp.puntaje_final DESC

LIMIT 4;
