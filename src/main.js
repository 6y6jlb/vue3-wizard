import "./style.css"
import Wizard from "./components/Wizard/Wizard.vue"

export default {
	install: (app, options) => {
		app.component("vue-wizard", Wizard)
	},
}
