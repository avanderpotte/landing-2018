import MobileDetect from 'mobile-detect'

const md = new MobileDetect(window.navigator.userAgent)

export default class Support
{
    constructor()
    {
        // this.passive = SUPPORT_PASSIVE

        this.touch = ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)
        this.mobile = md.mobile()
    }
}
