import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';

function NewMeetupPage() {
  const router = useRouter();
	async function onAddMeetupHandler(data) {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const resData = await response.json();
		console.log(resData);

		if (!response.ok) {
			throw new Error(resData.message || 'Something went wrong!');
		}

		// redirect to home page
    router.push('/');
    
	}

	return (
		<>
			<Head>
				<title>Add a New Meetup</title>
				<meta
					name="description"
					content="Add your own meetups and create amazing networking opportunities."
				/>
			</Head>
			<NewMeetupForm onAddMeetup={onAddMeetupHandler} />
		</>
	);
}

export default NewMeetupPage;
