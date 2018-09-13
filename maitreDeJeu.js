'use strict'

class MaitreDeJeu extends Ordonnanceur {
	constructor() {
		super(`
			CALL getNombreAlea PARAM inf: 1, sup: 32 TO nombreADeviner ENDCALL,
			WHILE $-nombreADeviner-$ != $-nombreEssayé-$ DO
				IF parseInt($-nombreEssayé-$) < $-nombreADeviner-$ THEN
					CALL sache PARAM info: 'trop petit' TO _ ENDCALL
				ELSE
					IF parseInt($-nombreEssayé-$) > $-nombreADeviner-$ THEN
						CALL sache PARAM info: 'trop grand' TO _ ENDCALL
					ELSE
						---
					ENDIF,
				ENDIF,
				CALL ditEssai NOPARAM TO nombreEssayé ENDCALL,
				SC.await(SCEVT('ditEssai_fini'))
			ENDWHILE,
			CALL sache PARAM info: 'gagné !' TO _ ENDCALL
		`)
	}
}

monde.addActor(new TireurAuSort())
monde.addActor(new Devineur($ID('plateau')))
monde.addActor(new MaitreDeJeu())
