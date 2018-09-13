'use strict'

class Ordonnanceur extends SCCube {
	constructor(ps_prog) {
		super()
		let ls_prog = 'SC.seq(' + ps_prog + ')'
		ls_prog = ls_prog.replace(/ELSE/g, `,`)
		ls_prog = ls_prog.replace(/ THEN/g, `),`)
		ls_prog = ls_prog.replace(/IF /g, `SC.test(m=>(`)
		ls_prog = ls_prog.replace(/ENDIF/g, `)`)
		ls_prog = ls_prog.replace(/ENDWHILE/g, `)`)
		ls_prog = ls_prog.replace(/ DO/g, `),`)
		ls_prog = ls_prog.replace(/WHILE /g, `SC.ifRepeat(m=>(`)
		ls_prog = ls_prog.replace(/-\$/g, `']`)
		ls_prog = ls_prog.replace(/\$-/g, `this.VAR['`)
		ls_prog = ls_prog.replace(/ NOPARAM TO /g, `'), {demandeur: this, nomReponse: '`)
		ls_prog = ls_prog.replace(/---/g, `SC.nothing()`)
		ls_prog = ls_prog.replace(/ ENDCALL/g, `'}, 1), SC.pause() )`)
		ls_prog = ls_prog.replace(/ TO /g, `, demandeur: this, nomReponse: '`)
		ls_prog = ls_prog.replace(/ PARAM /g, `'), {`)
		ls_prog = ls_prog.replace(/CALL /g, `SC.seq(SC.generate(SCEVT('`)
		// console.log(ls_prog)
		this.p = eval(ls_prog)
	}
}