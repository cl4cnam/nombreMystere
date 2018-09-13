'use strict'

class TireurAuSort extends ExecutantRobot {
	getNombreAlea(p_demande) {
		return Math.floor( Math.random() * (p_demande.sup - p_demande.inf) ) + p_demande.inf
	}
}
