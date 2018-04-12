import raf from 'raf'
import SceneObj from 'WebGLCore/scene'
import Dummy from './meshes/dummy'
import Config from 'WebGLConfig'

class App
{
    constructor(container)
    {
        this.scene = new SceneObj({
            container: container,
            ...Config
        })

        this.container = container

        this.DELTA_TIME = 0
        this.LAST_TIME = Date.now()

        this.initMeshes()
        this.update()
    }

    initMeshes()
    {
        this.dummy = new Dummy()
        this.scene.add(this.dummy)
    }

    update = () =>
    {
        this.DELTA_TIME = Date.now() - this.LAST_TIME
        this.LAST_TIME = Date.now()

        this.dummy.update(this.DELTA_TIME)

        this.scene.render(this.DELTA_TIME)
        raf(this.update)
    }

    resize = () =>
    {
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.scene.resize(this.width, this.height)
    }
}

export default App
