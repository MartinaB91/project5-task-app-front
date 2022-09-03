import { Container } from "react-bootstrap";
import HomeImage from "../assets/images/test-1.jpg"
import styles from "../styles/Home.module.css"

const HomePage = () => {
    return (
        <Container fluid id={styles["home-page-wrapper"]} className="p-0">
            <div id={styles["home-text-wrapper"]}>
                <h1 id={styles["home-header"]} className="text-start">Family Star</h1>
                <p id={styles["home-info-text"]}>
                    "Sed ut perspiciatis unde omnis iste natus error 
                    sit voluptatem accusantium doloremque laudantium, 
                    totam rem aperiam, eaque ipsa quae ab illo inventore 
                    veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit 
                    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem 
                    sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit 
                    amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora. 
                </p>
            </div>
            <img id={styles["home-img"]} src={HomeImage} alt="throphy" />
        </Container>
    )
}

export default HomePage;