import { useEffect, useState } from "react";
import { useParams } from "react-router";
import storyApi from "../../helpers/storyApi";

export default function ViewStory() {
    const userId = useParams().id;
    const [stories, setStories] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await storyApi.getStories({ userId });

            setStories(data);
        })();
    }, [userId]);

    return (
        <div>
            {stories.map(s => {
                return <img src={s.image} style={{ width: "200px" }} />;
            })}
        </div>
    );
}
