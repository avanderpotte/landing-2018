import WebGLApp from '../../webgl/app'

export default
{
    name: 'app-webgl-canvas',

    data()
    {
        return {
            windowH: window.innerHeight
        }
    },

    created()
    {
        this.eventHub.$on('window:resize', this.onResize)
    },

    mounted()
    {
        this.webGLApp = new WebGLApp(this.$el)
    },

    methods:
    {
        onResize(size)
        {
            this.windowH = size.height
            this.webGLApp.resize()
        }
    }
}
