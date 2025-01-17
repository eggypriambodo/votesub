import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from 'config/firebase';

const useGetTotalVotes = (subjectId: string) => {
    const [totalVotes, setTotalVotes] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const candidates = query(
                collection(firestore, 'candidates'),
                where('subjectId', '==', subjectId),
            );
            const candidatesSnapShot = await getDocs(candidates);
            const rawTotalVotes: number[] = [];

            candidatesSnapShot.forEach((candidate) => {
                const candidateDetails = candidate.data();
                rawTotalVotes.push(candidateDetails?.votes || 0);
            });

            const calcTotalVotes = rawTotalVotes.reduce((prevVal, currVal) => prevVal + currVal, 0);
            setTotalVotes(calcTotalVotes);
        })();
    }, []);

    return totalVotes;
};

export default useGetTotalVotes;
