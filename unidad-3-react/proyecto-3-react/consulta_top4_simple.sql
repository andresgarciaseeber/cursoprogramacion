-- Consulta SIMPLE de TOP 4 - Solo datos básicos solicitados

SELECT 
    pm.id as id_proyecto,
    pm.proyecto_musical as nombre_proyecto,
    pm.nombre as nombre_apellido_titular,
    pm.dni,
    ROUND(rp.puntaje_final, 2) as puntaje_final,
    ROUND(rp.puntaje_base, 2) as puntaje_base,
    ROUND(rp.ajuste_historial, 2) as ajuste_historial,
    rp.veces_presentado,
    rp.veces_ganador,
    pm.ciudad,
    pm.provincia,
    pm.genero_musical

FROM ranking_proyectos rp
INNER JOIN proyectos_musicales pm ON rp.id = pm.id

WHERE rp.estado_evaluacion = 'Completo'

ORDER BY rp.puntaje_final DESC

LIMIT 4;
