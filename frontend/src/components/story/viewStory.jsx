import { useLocation } from "react-router";

export default function ViewStory() {
    const userId = useLocation().state.id;
}
