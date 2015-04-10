define( [
    'osgShadow/ScreenShadowMap',
    'osgShadow/ShadowAttribute',
    'osgShadow/ShadowFrustumIntersection',
    'osgShadow/ShadowMap',
    'osgShadow/ShadowSettings',
    'osgShadow/ShadowTechnique',
    'osgShadow/ShadowTexture',
    'osgShadow/ShadowedScene'
], function ( ScreenShadowMap, ShadowAttribute, ShadowFrustumIntersection, ShadowMap, ShadowSettings, ShadowTechnique, ShadowTexture, ShadowedScene ) {
    'use strict';

    var osgShadow = {};

    osgShadow.ScreenShadowMap = ScreenShadowMap;
    osgShadow.ShadowAttribute = ShadowAttribute;
    osgShadow.ShadowFrustumIntersection = ShadowFrustumIntersection;
    osgShadow.ShadowMap = ShadowMap;
    osgShadow.ShadowedScene = ShadowedScene;
    osgShadow.ShadowSettings = ShadowSettings;
    osgShadow.ShadowTechnique = ShadowTechnique;
    osgShadow.ShadowTexture = ShadowTexture;


    return osgShadow;
} );
