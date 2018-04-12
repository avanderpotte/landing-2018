import { Scene, PerspectiveCamera, WebGLRenderer, Vector3 } from 'three'
import Stats from 'stats-js'
import OrbitControls from 'orbit-controls'

class SceneObj extends Scene
{
    constructor(options)
    {
        super()
        const defaultOptions = {
            camera: {
                fov: 45,
                near: 1,
                far: 1000,
                position: new Vector3(0, 0, 100)
            },
            renderer: {
                alpha: true,
                antialias: false,
                pixelRatio: Math.max(1, Math.min(window.devicePixelRatio, 2))
            },
            debug: {
                stats: false,
                orbitControls: false
            }
        }

        this.options = { ...defaultOptions, ...options }

        this.container = this.options.container

        this.width = window.innerWidth
        this.height = window.innerHeight

        this.renderer = new WebGLRenderer(this.options.renderer)
        this.renderer.setSize(this.width, this.height)
        this.renderer.setClearAlpha(0)

        this.container.appendChild(this.renderer.domElement)

        this.camera = new PerspectiveCamera(this.options.fov, this.width / this.height, this.options.near, this.options.far)
        this.camera.position.copy(this.options.camera.position)

        if(this.options.debug.stats)
            this.initStats()

        if(this.options.debug.orbitControls)
            this.initControls()
    }

    initControls()
    {
        this.controls = new OrbitControls({
            position: this.camera.position.toArray(),
            parent: this.renderer.domElement,
            distanceBounds: [10, 20]
        })
        this.target = new Vector3()
        this.camera.lookAt(this.target)
    }

    initStats()
    {
        this.stats = new Stats()
        this.stats.domElement.style.position = 'absolute'
        this.stats.domElement.style.left = '0px'
        this.stats.domElement.style.top = '0px'
        this.stats.domElement.addEventListener('mousedown', (e) =>
        {
            e.stopPropagation()
        }, false)

        this.container.appendChild(this.stats.domElement)
    }

    render()
    {
        if(this.options.debug.orbitControls)
        {
            this.controls.update()
            this.camera.position.fromArray(this.controls.position)
            this.camera.up.fromArray(this.controls.up)
            this.camera.lookAt(this.target.fromArray(this.controls.direction))
        }
        else
        {
            this.renderer.render(this, this.camera)
        }

        if(this.options.debug.stats)
            this.stats.update()
    }

    resize(newWidth, newHeight)
    {
        this.camera.aspect = newWidth / newHeight
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(newWidth, newHeight)

        if(this.composer)
            this.composer.setSize(newWidth, newHeight)
    }
}

export default SceneObj
