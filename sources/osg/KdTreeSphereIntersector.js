'use strict';
var MACROUTILS = require( 'osg/Utils' );
var Vec3 = require( 'osg/Vec3' );
var KdTreeRayIntersector = require( 'osg/KdTreeRayIntersector' );
var TriangleSphereIntersector = require( 'osgUtil/TriangleSphereIntersector' );


var KdTreeSphereIntersector = function () {

    this._intersector = new TriangleSphereIntersector();

};

KdTreeSphereIntersector.prototype = MACROUTILS.objectInherit( KdTreeRayIntersector.prototype, {

    init: function ( intersections, center, radius, nodePath ) {

        this._intersector._intersections = intersections;
        this._intersector.setNodePath( nodePath );
        this._intersector.set( center, radius );
        this._center = center;
        this._radius = radius;

    },

    intersect: ( function () {

        var v0 = Vec3.create();
        var v1 = Vec3.create();
        var v2 = Vec3.create();

        return function ( node ) {
            var first = node._first;
            var second = node._second;
            var triangles = this._triangles;
            var vertices = this._vertices;

            if ( first < 0 ) {
                // treat as a leaf
                var istart = -first - 1;
                var iend = istart + second;
                var intersector = this._intersector;
                intersector.index = istart;

                for ( var i = istart; i < iend; ++i ) {
                    var id = i * 3;
                    var iv0 = triangles[ id ] * 3;
                    var iv1 = triangles[ id + 1 ] * 3;
                    var iv2 = triangles[ id + 2 ] * 3;

                    v0[ 0 ] = vertices[ iv0 ];
                    v0[ 1 ] = vertices[ iv0 + 1 ];
                    v0[ 2 ] = vertices[ iv0 + 2 ];

                    v1[ 0 ] = vertices[ iv1 ];
                    v1[ 1 ] = vertices[ iv1 + 1 ];
                    v1[ 2 ] = vertices[ iv1 + 2 ];

                    v2[ 0 ] = vertices[ iv2 ];
                    v2[ 1 ] = vertices[ iv2 + 1 ];
                    v2[ 2 ] = vertices[ iv2 + 2 ];

                    intersector.intersect( v0, v1, v2 );
                }
            } else {
                if ( first > 0 ) {
                    if ( this.intersectSphere( this._kdNodes[ first ]._bb ) ) {
                        this.intersect( this._kdNodes[ first ] );
                    }
                }
                if ( second > 0 ) {
                    if ( this.intersectSphere( this._kdNodes[ second ]._bb ) ) {
                        this.intersect( this._kdNodes[ second ] );
                    }
                }
            }
        };
    } )(),
    intersectSphere: ( function () {
        var tmp = Vec3.create();
        return function ( bb ) {
            var r = this._radius + bb.radius();
            return Vec3.distance2( this._center, bb.center( tmp ) ) <= r * r;
        };
    } )()
} );

module.exports = KdTreeSphereIntersector;
