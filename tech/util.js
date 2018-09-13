'use strict'

const $ID = document.getElementById.bind(document)

const g_AllSCevents = {}
const g_AllSCsensors = {}

function SCEVT(ps_nom) {
	if(g_AllSCevents[ps_nom] === undefined) {
		g_AllSCevents[ps_nom] = SC.evt(ps_nom)
	}
	return g_AllSCevents[ps_nom]
}

function SCSENSOR(ps_id, ps_eventDom) {
	const lElt_cible = $ID(ps_id)
	if(lElt_cible === null) {
		// return SCEVT('patience')
		monde.generateEvent(SCEVT('$pas_encore_la$'))
		return SCEVT('$pas_encore_la$')
	}
	if(g_AllSCsensors[ps_id + '/' + ps_eventDom] === undefined) {
		g_AllSCsensors[ps_id + '/' + ps_eventDom] = monde.systemEvent(lElt_cible, ps_eventDom)
	}
	return g_AllSCsensors[ps_id + '/' + ps_eventDom]
}

class SCCube extends SC.cube().constructor {
	constructor(pProg) {
		super(null, pProg)
		this.o = this
	}
}

function addInstrToPar(pProg_par, pProg_instr, pCube) {
	const l_activeParACompleter = pProg_par.activeCopy
	const l_activeParBranch = l_activeParACompleter.branches[l_activeParACompleter.branches.length - 1]
	l_activeParACompleter.add(
		pProg_instr.bindTo(
			monde,
			l_activeParBranch,
			null, null,
			l_activeParBranch, pCube
		)
	)
}

const VAR = {}

function Var(ps_nom, pFunc, pEvt) { // function pFunc(val, valEnvoyee)
	return SC.cell({
		target: SC.vars,
		field: ps_nom,
		sideEffect: (val, evts) => pFunc(val, evts[pEvt][0]),
		eventList: [pEvt]
	})
}

const monde = SC.machine(200)

monde.addActor = monde.addProgram

