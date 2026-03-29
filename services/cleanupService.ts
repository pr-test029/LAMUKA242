
import { db, collection, getDocs, deleteDoc, doc } from './firebase';

export const cleanupDuplicates = async () => {
    console.log("Starting cleanup...");
    const snapshot = await getDocs(collection(db, "posts"));
    const seenTitles = new Map();
    let deletedCount = 0;

    for (const d of snapshot.docs) {
        const data = d.data();
        const title = data.title.toLowerCase().trim();
        if (seenTitles.has(title)) {
            console.log(`Deleting duplicate: ${title} (${d.id})`);
            await deleteDoc(doc(db, "posts", d.id));
            deletedCount++;
        } else {
            seenTitles.set(title, d.id);
        }
    }
    console.log(`Cleanup finished. Deleted ${deletedCount} duplicates.`);
    return deletedCount;
};
