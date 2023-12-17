import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

export function createFighterName(fighter) {
    const { name } = fighter;

    const nameElement = createElement({
        tagName: 'p',
        className: 'fighter-preview___name'
    });
    nameElement.innerText = `Selected fighter: ${name}`;

    return nameElement;
}

export function createFighterHealth(fighter) {
    const { health } = fighter;

    const healshlement = createElement({
        tagName: 'p',
        className: 'fighter-preview___helth'
    });
    healshlement.innerText = `Fighters health: ${health}`;
    return healshlement;
}

export function createfighterAttack(fighter) {
    const { attack } = fighter;

    const attackElement = createElement({
        tagName: 'p',
        className: 'fighter-preview___attack'
    });
    attackElement.innerText = `Fighters attack: ${attack}`;

    return attackElement;
}

export function createFighterDefence(fighter) {
    const { defense } = fighter;

    const defenceElement = createElement({
        tagName: 'p',
        className: 'fighter-preview___defence'
    });
    defenceElement.innerText = `Fighters attack: ${defense}`;

    return defenceElement;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });
    const fighterWrapper = createElement({
        tagName: 'div',
        className: `${positionClassName}--wrapper`
    });
    const descriptionWrapper = createElement({
        tagName: 'div',
        className: `fighter-description-wraper`
    });
    // todo: show fighter info (image, name, health, etc.)
    const fighterImg = createFighterImage(fighter);
    const fighterName = createFighterName(fighter);
    const fighterHealth = createFighterHealth(fighter);
    const fighterAttack = createfighterAttack(fighter);
    const fighterDefence = createFighterDefence(fighter);

    descriptionWrapper.append(fighterName, fighterHealth, fighterAttack, fighterDefence);
    fighterWrapper.append(fighterImg, descriptionWrapper);
    fighterElement.append(fighterWrapper);

    return fighterElement;
}
