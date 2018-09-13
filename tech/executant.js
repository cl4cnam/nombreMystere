'use strict'

class Executant extends SCCube {
	constructor() {
		super(null)
		
		const lArray_methodes = Object.getOwnPropertyNames(this.__proto__)
		lArray_methodes.splice(lArray_methodes.indexOf('constructor'), 1)
		
		for(let ls_nomEvt of lArray_methodes) {
			this[ls_nomEvt + '_GEN'] = function (pEvtRecu) {
				const l_demandes = pEvtRecu[SCEVT(ls_nomEvt)]
				for (let l_demande of l_demandes) {
					l_demande.demande = ls_nomEvt
					l_demande.demandeur.VAR = l_demande.demandeur.VAR || {}
					this.execDemande(ls_nomEvt, l_demande)
				}
			}
			this[ls_nomEvt + '_FINI'] = function (pEvtRecu) {
				console.log('FINI', ls_nomEvt)
			}
		}
		
		const lArray_progPar = lArray_methodes.map(ps_nomEvt=>
			SC.repeat(SC.forever,
				SC.await(SCEVT(ps_nomEvt)),
				// SC.log('--> demande reçue : ' + ps_nomEvt),
				SC.actionOn(SCEVT(ps_nomEvt), ps_nomEvt + '_GEN', undefined, 1),
				SC.pause(),
				SC.await(SCEVT(ps_nomEvt + '_fini')),
				// SC.log('--> fin demande reçue : ' + ps_nomEvt),
				SC.actionOn(SCEVT(ps_nomEvt + '_fini'), ps_nomEvt + '_FINI', undefined, 1)
			)
		)
		
		this.p = new (SC.par().constructor)(lArray_progPar)
		
	}
}
