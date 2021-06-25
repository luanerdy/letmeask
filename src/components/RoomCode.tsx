import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}

const RoomCode = (props: RoomCodeProps) => {
    const copyRoomCodeToClipboard = () => {
        navigator.clipboard.writeText(props.code);
    };

    return (
        <button className="room-code">
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span onClick={copyRoomCodeToClipboard}>Sala #{props.code}</span>
        </button>
    );
}

export { RoomCode };
