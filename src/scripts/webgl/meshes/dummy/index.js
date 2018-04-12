import { Object3D, Color, ShaderMaterial, AnimationMixer, Box3 } from 'three'
import glslify from 'glslify'
import fragmentShader from './shader/frag.glsl'
import vertexShader from './shader/vert.glsl'
import FBXLoader from '../../utils/FBXLoader'

class Dummy extends Object3D
{
    constructor()
    {
        super()
        this.uniforms = {
            uTime: { value: 0 },
            uColor: { value: new Color(0xF3F3F3) }
        }
        const material = new ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: glslify(fragmentShader),
            vertexShader: glslify(vertexShader),
            skinning: true,
            needsUpdate: true
        })

        this.mixers = []
        this.loader = new FBXLoader()
        this.loader.load('/static/models/dummy_greeting.fbx', (object) =>
        {
            object.mixer = new AnimationMixer(object)
            this.mixers.push(object.mixer)

            const action = object.mixer.clipAction(object.animations[0])
            action.play()
            object.traverse((child) =>
            {
                if(child.isMesh)
                {
                    child.geometry.computeVertexNormals()

                    child.material = material
                    child.verticesNeedUpdate = true
                    child.normalsNeedUpdate = true
                    child.uvsNeedUpdate = true
                }
            })
            object.scale.set(0.4, 0.4, 0.4)
            const box = new Box3().setFromObject(object)
            const size = box.getSize()
            object.position.y = -size.y / 2
            object.position.x = size.x / 2
            object.rotation.y = -Math.PI / 5
            this.add(object)
        })
    }

    update = (dt) =>
    {
        if(this.mixers.length > 0)
        {
            for(let i = 0; i < this.mixers.length; i++)
            {
                this.mixers[i].update(dt * 0.001)
            }
        }
        this.uniforms.uTime.value += dt * 0.001
    }
}

export default Dummy
