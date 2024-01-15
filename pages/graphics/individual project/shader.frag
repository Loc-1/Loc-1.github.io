// credit: Lachlan Moore
// sea slug: Jorunna parva 'Sea Bunny'
// photo link: https://www.treehugger.com/thmb/T_GgefX_8EQPCYbQlWvhEc0OtlE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sea-bunny-nudi-c8711bfe348b410ea48aad5260821f50.jpg
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 Rot(float a)
{
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}

float rand(vec2 a)
{
    return fract(sin(dot(a.xy ,vec2(16.40294,32.456))) * 64048.481);
}


// Created by inigo quilez - iq/2014
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
vec2 hash( vec2 p )
{
    p = vec2( dot(p,vec2(2127.1,81.17)), dot(p,vec2(1269.5,283.37)) );
    return fract(sin(p)*43758.5453);
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );
    
    vec2 u = f*f*(3.0-2.0*f);

    float n = mix( mix( dot( -1.0+2.0*hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                        dot( -1.0+2.0*hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                   mix( dot( -1.0+2.0*hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                        dot( -1.0+2.0*hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
    return 0.5 + 0.5*n;
}

float sdArc( in vec2 p, in vec2 sc, in float ra, float rb )
{
    // sc is the sin/cos of the arc's aperture
    p.x = abs(p.x);
    return ((sc.y*p.x>sc.x*p.y) ? length(p-sc*ra) : 
                                  abs(length(p)-ra)) - rb;
}

float sdOrientedVesica( vec2 p, vec2 a, vec2 b, float w )
{
    float r = 0.5*length(b-a);
    float d = 0.5*(r*r-w*w)/w;
    vec2 v = (b-a)/r;
    vec2 c = (b+a)*0.5;
    vec2 q = 0.5*abs(mat2(v.y,v.x,-v.x,v.y)*(p-c));
    vec3 h = (r*q.x<d*(q.y-r)) ? vec3(0.0,r,0.0) : vec3(-d,0.0,d+w);
    return length( q-h.xy) - h.z;
}

void main() {
   // set up vars
   vec2 st = (2.0*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;
   float ratio = u_resolution.x / u_resolution.y;
   vec3 col = vec3(0.0, 0.0, 0.0); 
   
	vec2 tuv = st;
   tuv -= .5;

   // rotate with Noise
   float degree = noise(vec2(u_time*.1, tuv.x*tuv.y));

   tuv.y *= 1./ratio;
   tuv *= Rot(radians((degree-.5)*720.+180.));
   tuv.y *= ratio;

    
   // Wave warp with sin
   float frequency = 5.;
   float amplitude = 30.;
   float speed = u_time * 2.;
   tuv.x += sin(tuv.y*frequency+speed)/amplitude;
   tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);
    
   
   // body simple arc
   float d = sdArc(st + vec2(0.01,0.79), vec2(0.7,0.7), 0.772, 0.316) - 0.1;
   // ears
   float k = sdOrientedVesica(st +vec2(-0.050,0.450), vec2(0.630,0.750), vec2(0.700,0.300), 0.108);
	k = min(k, sdOrientedVesica(st +vec2(0.320,0.650), vec2(0.340,0.580), vec2(0.700,0.300), 0.108));
	k = min(k, sdOrientedVesica(st +vec2(1.2,0.4), vec2(0.280,0.610), vec2(0.390,0.340), 0.052));
   k = min(k, sdOrientedVesica(st +vec2(1.25,0.4), vec2(0.280,0.610), vec2(0.390,0.340), 0.052));
   k = min(k, sdOrientedVesica(st +vec2(1.15,0.35), vec2(0.280,0.610), vec2(0.390,0.340), 0.052));
   k = min(k, sdOrientedVesica(st +vec2(1.1,0.35), vec2(0.280,0.610), vec2(0.390,0.340), 0.052));
    
   
   // colour
   if(d > 0.0 && k > 0.0) {
      vec3 b1 = vec3(0.036,0.220,0.985);
      vec3 b2 = vec3(0.097,0.727,0.985);
      vec3 l1 = mix(b1, b2, smoothstep(-0.868, 0.744, (tuv*Rot(radians(-5.0))).x));
      vec3 w1 = vec3(0.353,0.794,0.985);
      vec3 w2 = vec3(0.441,0.664,0.985);
      vec3 l2 = mix(w1, w2, smoothstep(-0.492, 0.632, (tuv*Rot(radians(-5.0))).x));
       col = mix(l1, l2, smoothstep(-0.876, 1.756, tuv.y));
   } else if (k < 0.0) {
      vec3 start = vec3(1.0, 1.0, 1.0);
      vec3 end = vec3(0.0, 0.0, 0.0);
      col = mix(start, end, smoothstep(-0.3, 0.3, st.y));
   } else {
      vec2 uv = gl_FragCoord.xy / 20.0;
      uv -= u_time * 0.3;
      vec2 g  = fract(uv) - 0.4;
      float off = rand(ceil(uv));
      float t = u_time * (off - 0.5);
      float angle = 1.1 + t*7.0 + off ;
   	g += vec2(sin(angle),cos(angle)) * 0.3;
      float w = (sin((noise(uv))+t)+1.0)*0.24;
      float e = 1.0-smoothstep(length(g)*2.5,length(g)*2.5+0.1,w);
      col = vec3(e);
      } 
   colour_out = vec4(col,1.0);
}