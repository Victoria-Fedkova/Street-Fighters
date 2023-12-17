import createElement from '../../helpers/domHelper';
import showModal from './modal';

export default function showWinnerModal(fighter) {
    // call showModal function
    function hideModal() {
        const modal = document.getElementsByClassName('modal-layer')[0];
        modal?.remove();
    }
    const message = createElement({ tagName: 'p', className: 'winner-message' });
    message.innerText = ` ${fighter.name} WINS!`;

    showModal({ title: `Fight is over`, bodyElement: message, onClose: hideModal });
}
