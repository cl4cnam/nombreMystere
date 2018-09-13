'use strict'

class ExecutantRobot extends Executant {
	constructor(){
		super()
	}
	execDemande(ps_nomEvt, p_demande) {
		p_demande.demandeur.VAR[p_demande.nomReponse] = this[ps_nomEvt](p_demande)
		monde.generateEvent(SCEVT(ps_nomEvt + '_fini'), p_demande)
	}
}
