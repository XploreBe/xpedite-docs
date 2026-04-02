---
sidebar_position: 1
slug: /
---

# Wat is Xpedite?

AI coding assistants zijn krachtig maar ze produceren standaard code die niet
voldoet aan de standaarden van jouw team. Ze slaan statische analyse over,
negeren coverage-drempelwaarden, vergeten build-plugins te configureren en
leveren output die nooit een pull-request review zou doorstaan. Ze onbeheerd
laten draaien is riskant: er is geen sandbox, geen auditspoor en geen manier
om te zien wat ze aan het doen zijn.

in dit **Xpedite** project configureren wij een opinionated AI Coding Assistant die niet zomaar code schrijft
hij schrijft code zoals jouw team dat verwacht. Gebouwd bovenop
[OpenCode](https://opencode.ai), voegt Xpedite drie dingen toe die ontbreken bij
algemene coding agents:

## De drie pijlers

### 🛡️ Afgedwongen kwaliteitsstandaarden
Een bibliotheek van hooks en skills die automatisch de coding best practices van
jouw team toepassen: Checkstyle, PMD, JaCoCo, compiler strictness en OpenRewrite 
zodat de output van de AI aan dezelfde lat voldoet als die van elke menselijke
contributor.

### 🔒 Veilige, onbeheerde uitvoering
Een sandboxinglaag die agents in geïsoleerde omgevingen laat werken, met
resourcelimieten en guardrails, zodat je een taak kunt indienen en gerust weg
kunt lopen.

### 📊 Volledige observability
Een realtime dashboard om draaiende agents te monitoren, hun logs te streamen,
diffs te reviewen en kosten bij te houden. Zodat je altijd weet wat de AI
aan het doen is.

---

Klaar om te starten? Ga naar [Vereisten](./getting-started/prerequisites) of
spring meteen naar de [Snelstart](./getting-started/quick-start).