import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";
import SignUpForm from "../pages/SignUp";
import Rabbit from "../assets/images/rabbit-5.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons'

const HomePage = () => {
    return (
        <Container fluid id={styles["home-page-wrapper"]} className="p-0">
            <div id={styles["home-text-wrapper"]}>
                <h1 id={styles["home-header"]} className="text-start">Family Star</h1>
                <div id={styles["home-info-text"]}>
                    <p>
                        Are you tired of trying to get your kids to help out at home?
                        With Family Star you can make ordinary households tasks something fun by turning it into a game!
                        The are rules are quite simple, collect as many stars <FontAwesomeIcon icon={faStar} className={styles.FontAwesomeIconStar} /> as you can by completing households
                        tasks from your shared taskboard. The member that has collected the highest amount of star points
                        is the Family Star.
                    </p>
                    <p>Ready to try a new way of family teamwork?<Link to="/signup" onClick={SignUpForm} className={styles.LinkSignUp}> Get started</Link></p>

                </div>
            </div>
            <img id={styles["home-img"]} src={Rabbit} alt="throphy" />
        </Container>
    )
}

export default HomePage;