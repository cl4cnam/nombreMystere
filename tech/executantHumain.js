'use strict'

class ExecutantHumain extends Executant {
	constructor(pHtmlElt_ancrage) {
		super()
		this.htmlElt_ancrage = pHtmlElt_ancrage
	}
	execDemande(ps_nomEvt, p_demande) {
		console.log('execDemande', ps_nomEvt)
		this[ps_nomEvt](p_demande)
	}
	demandeInfo(ps_message, p_demande, ps_caller) {
		console.log('debut appel demandeInfo', ps_caller)
		const lElt_groupe = document.createElement('div')
		const lElt_parag = document.createElement('p')
		const lElt_input = document.createElement('input')
		
		lElt_parag.innerHTML = ps_message
		lElt_input.setAttribute('type', 'text')
		lElt_input.setAttribute('id', 'reponse')
		lElt_groupe.appendChild(lElt_parag)
		lElt_groupe.appendChild(lElt_input)
		
		lElt_input.addEventListener('change', evt =>{
			// console.log('addEventListener', ps_caller + '_fini')
			p_demande.demandeur.VAR[p_demande.nomReponse] = lElt_input.value
			this.htmlElt_ancrage.removeChild(lElt_groupe)
			monde.generateEvent(SCEVT(ps_caller + '_fini'), p_demande)
		})
		
		setTimeout( ()=>lElt_input.focus(), 0 )
		
		this.htmlElt_ancrage.appendChild(lElt_groupe)
	}
	donneInfo(ps_message, p_demande, ps_caller) {
		const lElt_parag = document.createElement('p')
		lElt_parag.innerHTML = ps_message
		this.htmlElt_ancrage.appendChild(lElt_parag)
		monde.generateEvent(SCEVT(ps_caller + '_fini'), p_demande)
	}
}
