// import { useRouter } from 'next/router';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { ObjectId } from 'mongodb';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

function MeetupDetails(props) {
	// setting up the head component
	

	return (
		<>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name="description" content={props.meetupData.description} />

			</Head>
			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</>
	);
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		'mongodb+srv://dvidalv:KutXAPws8Um7rKCR@cluster0.roeq8.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

	client.close();

	return {
		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { params } = context;

	const meetupId = params.meetupId;

	const client = await MongoClient.connect(
		'mongodb+srv://dvidalv:KutXAPws8Um7rKCR@cluster0.roeq8.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId.createFromHexString(meetupId),
	});

	client.close();

	return {
		props: {
			meetupData: {
				id: meetupId,
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
			},
		},
		revalidate: 10,
	};
}

export default MeetupDetails;
