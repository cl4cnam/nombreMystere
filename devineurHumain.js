'use strict'

class Devineur extends ExecutantHumain {
	constructor(pHtmlElt_ancrage) {
		super(pHtmlElt_ancrage)
	}
	ditEssai(p_demande) {
		this.demandeInfo('Fais un essai : ', p_demande, 'ditEssai')
	}
	sache(p_demande) {
		this.donneInfo('Info : ' + p_demande.info, p_demande, 'sache')
	}
}
