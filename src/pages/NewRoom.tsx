import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import useAuth from '../hooks/useAuth';
import '../styles/auth.scss';
import { database } from '../services/firebase';

const NewRoom = () => {
	const { user } = useAuth();
	const [newRoom, setNewRoom] = useState('');
    const history = useHistory();

	const handleCreateRoom = async (event: FormEvent) => {
		event.preventDefault();

		if (newRoom.trim() === '') {
			return;
		}

		const roomsRef = database.ref('rooms');

		const firebaseRoom = await roomsRef.push({
			title: newRoom,
			authorId: user?.id,
		});

        setNewRoom('');
        history.push(`/rooms/${firebaseRoom.key}`);
	};

	return (
		<div id="page-auth">
			<aside>
				<img
					src={illustrationImg}
					alt="Ilustração simbolizando perguntas e respostas"
				/>
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo real</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logoImg} alt="Letmeask" />
					<h2>Criar uma nova sala</h2>
					<form onSubmit={handleCreateRoom}>
						<input
							type="text"
							placeholder="Nome da sala"
							value={newRoom}
							onChange={(e) => setNewRoom(e.target.value)}
						/>
						<Button type="submit">Criar sala</Button>
					</form>
					<p>
						Quer entrar em uma sala existente?{' '}
						<Link to="/">clique aqui</Link>
					</p>
				</div>
			</main>
		</div>
	);
};

export default NewRoom;
