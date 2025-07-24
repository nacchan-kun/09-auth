import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: 'Note Details - NoteHub',
    description: 'View note details',
    openGraph: {
      title: 'Note Details - NoteHub',
      description: 'View note details',
      url: `https://09-auth-gamma-lyart.vercel.app/notes/${id}`,
      siteName: 'NoteHub',
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  
  return <NoteDetailsClient noteId={id} />;
};

export default NoteDetails;