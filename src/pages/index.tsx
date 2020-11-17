import { Wrapper } from "../components/Wrapper";
import { Navbar } from "../components/Navbar";
import { withApollo } from "../utils/withApollo";
import React from "react";
import { Flex, IconButton, Image, Stack, Text } from "@chakra-ui/core";
import useWindowSize from "../utils/useWindowSize";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useRouter } from "next/router";

const Index = () => {
    const checkSize = useWindowSize().width < 700;
    const router = useRouter();

    return (
        <>
            <Navbar />
            <Wrapper>
                <Text textAlign="center" fontSize="6xl">
                    THE BOIS
                </Text>

                <Flex direction="column">
                    <Stack spacing="20">
                        <Flex
                            justify="space-between"
                            align="center"
                            direction={checkSize ? "column-reverse" : "row"}
                        >
                            <Flex direction="column" m={5}>
                                <Text
                                    fontSize="5xl"
                                    textAlign={checkSize ? "center" : "inherit"}
                                >
                                    Emir Derouche
                                    <Flex
                                        my={3}
                                        justify={
                                            checkSize ? "center" : "row-start"
                                        }
                                    >
                                        <IconButton
                                            mr={3}
                                            bg="transparent"
                                            aria-label="Facebook"
                                            onClick={() =>
                                                router.push(
                                                    "https://www.facebook.com/ederouiche"
                                                )
                                            }
                                            as={FaFacebook}
                                        />
                                        <IconButton
                                            mx={3}
                                            bg="transparent"
                                            aria-label="Instagram"
                                            onClick={() =>
                                                router.push(
                                                    "https://www.instagram.com/emirderouiche/"
                                                )
                                            }
                                            as={FaInstagram}
                                        />
                                        <IconButton
                                            mx={3}
                                            bg="transparent"
                                            aria-label="GitHub"
                                            onClick={() =>
                                                router.push(
                                                    "https://github.com/memir0"
                                                )
                                            }
                                            as={FaGithub}
                                        />
                                        <IconButton
                                            mx={3}
                                            bg="transparent"
                                            aria-label="GitHub"
                                            onClick={() =>
                                                router.push(
                                                    "https://www.linkedin.com/in/emir-d-17a4239a/"
                                                )
                                            }
                                            as={FaLinkedin}
                                        />
                                    </Flex>
                                </Text>
                                <Text
                                    textAlign={checkSize ? "center" : "inherit"}
                                    fontSize="lg"
                                >
                                    Ikke spør oss hvordan, for vi vet det ikke
                                    selv, men denne lille villmannen av en
                                    osloøst-kar er Speedingos enerådende leder.
                                    Han er en kløpper bak skjermen, men en enda
                                    større kriger på byen. Det finnes ikke et
                                    tallsystem stort nok til å nummerere alle
                                    kvinnene Emir Derouiche har erobret(bilde 3
                                    verifiserer dette). All hail the CEO
                                </Text>
                            </Flex>
                            <Image
                                size="300px"
                                objectFit="cover"
                                src="/emir.jpg"
                                alt="Emir Derouche"
                            />
                        </Flex>
                        <Flex
                            direction={
                                checkSize ? "column-reverse" : "row-reverse"
                            }
                            justify="space-between"
                            align="center"
                        >
                            <Flex direction="column" m={5}>
                                <Text
                                    fontSize="5xl"
                                    textAlign={checkSize ? "center" : "inherit"}
                                >
                                    Nikolai Dokken
                                    <Flex
                                        my={3}
                                        justify={
                                            checkSize ? "center" : "row-start"
                                        }
                                    >
                                        <IconButton
                                            mr={3}
                                            bg="transparent"
                                            aria-label="Facebook"
                                            onClick={() =>
                                                router.push(
                                                    "https://www.facebook.com/nikolai.dokken.3"
                                                )
                                            }
                                            as={FaFacebook}
                                        />
                                        <IconButton
                                            mx={3}
                                            bg="transparent"
                                            aria-label="Instagram"
                                            onClick={() =>
                                                router.push(
                                                    "https://www.instagram.com/nikolaidokken/"
                                                )
                                            }
                                            as={FaInstagram}
                                        />
                                        <IconButton
                                            mx={3}
                                            bg="transparent"
                                            aria-label="GitHub"
                                            onClick={() =>
                                                router.push(
                                                    "https://github.com/NikolaiDokken"
                                                )
                                            }
                                            as={FaGithub}
                                        />
                                        <IconButton
                                            mx={3}
                                            bg="transparent"
                                            aria-label="GitHub"
                                            onClick={() =>
                                                router.push(
                                                    "https://www.linkedin.com/in/nikolaidokken/"
                                                )
                                            }
                                            as={FaLinkedin}
                                        />
                                    </Flex>
                                </Text>
                                <Text
                                    fontSize="lg"
                                    textAlign={checkSize ? "center" : "inherit"}
                                >
                                    Nikko D🍆Bærumsgutten som bruker hundeleker
                                    på soverommet😱 Nikko stilte til valg som
                                    leder av speedingo på bakgrunn av sin
                                    tidligere erfaring som russebussjef, men
                                    fant sin plass som teknisk ansvarlig i
                                    stedet. Bærumsgutten har absolutt vodka
                                    innlagt i kjøkkenkrana, og bruker kun
                                    blandevann om det er bobler fra distriktet
                                    Champagne🥂 speedingo har vurdert flere
                                    ganger å kvitte seg med pappagutten, men han
                                    har en jævla digg søster, så han er verdt å
                                    beholde
                                </Text>
                            </Flex>
                            <Image
                                size="300px"
                                objectFit="cover"
                                src="/niko.jpeg"
                                alt="Nikolai Dokken"
                            />
                        </Flex>
                        <Flex
                            justify="space-between"
                            align="center"
                            direction={checkSize ? "column-reverse" : "row"}
                        >
                            <Flex direction="column" m={5}>
                                <Text
                                    fontSize="5xl"
                                    textAlign={checkSize ? "center" : "inherit"}
                                >
                                    Ian Evangelista
                                    <Flex
                                        my={3}
                                        justify={
                                            checkSize ? "center" : "row-start"
                                        }
                                    >
                                        <IconButton
                                            mr={3}
                                            bg="transparent"
                                            aria-label="Facebook"
                                            onClick={() =>
                                                router.push(
                                                    "https://www.facebook.com/ian.evangelista99/"
                                                )
                                            }
                                            as={FaFacebook}
                                        />
                                        <IconButton
                                            mx={3}
                                            bg="transparent"
                                            aria-label="Instagram"
                                            onClick={() =>
                                                router.push(
                                                    "https://www.instagram.com/ian_evangelista/"
                                                )
                                            }
                                            as={FaInstagram}
                                        />
                                        <IconButton
                                            mx={3}
                                            bg="transparent"
                                            aria-label="GitHub"
                                            onClick={() =>
                                                router.push(
                                                    "https://github.com/ianevangelista"
                                                )
                                            }
                                            as={FaGithub}
                                        />
                                        <IconButton
                                            mx={3}
                                            bg="transparent"
                                            aria-label="GitHub"
                                            onClick={() =>
                                                router.push(
                                                    "https://www.linkedin.com/in/ianevangelista/"
                                                )
                                            }
                                            as={FaLinkedin}
                                        />
                                    </Flex>
                                </Text>
                                <Text
                                    fontSize="lg"
                                    textAlign={checkSize ? "center" : "inherit"}
                                >
                                    Ian er Speedingos indrefilet. Denne
                                    askergutten er et bedre tilskudd til gruppa
                                    enn lammekaré er til kostholdet hans. Ian
                                    smiler og ler alltid, men det er bare et
                                    skalkeskjul for hans harde regime. Ian er
                                    CPO og iverksetter, og det finnes ikke noe
                                    Ian liker bedre enn å piske igang
                                    sosialemediaansvarlig om å legge ut flere
                                    instainnlegg. Gutten drikker som en
                                    nordlending, men med sine 54 muskuløse kilo
                                    går det som regel galt. Det ryktes om at
                                    askergutten har en pågående flørt med en av
                                    Trondheims kvinnelige studenter. Klarer du å
                                    gjette riktig er du med i trekningen av en
                                    Speedingo goodiebag😍kommenter svaret
                                </Text>
                            </Flex>
                            <Image
                                size="300px"
                                objectFit="cover"
                                src="/ian.jpg"
                                alt="Ian Evangelista"
                            />
                        </Flex>
                        <Flex
                            direction={
                                checkSize ? "column-reverse" : "row-reverse"
                            }
                            justify="space-between"
                            align="center"
                        >
                            <Flex direction="column" m={5}>
                                <Text
                                    fontSize="5xl"
                                    textAlign={checkSize ? "center" : "inherit"}
                                >
                                    Kasper Gundersen
                                    <Flex
                                        my={3}
                                        justify={
                                            checkSize ? "center" : "row-start"
                                        }
                                    >
                                        <IconButton
                                            mr={3}
                                            bg="transparent"
                                            aria-label="Facebook"
                                            onClick={() =>
                                                router.push(
                                                    "https://www.facebook.com/kasper.gundersen.7"
                                                )
                                            }
                                            as={FaFacebook}
                                        />
                                        <IconButton
                                            mx={3}
                                            bg="transparent"
                                            aria-label="Instagram"
                                            onClick={() =>
                                                router.push(
                                                    "https://www.instagram.com/kasper_v_g/"
                                                )
                                            }
                                            as={FaInstagram}
                                        />
                                        <IconButton
                                            mx={3}
                                            bg="transparent"
                                            aria-label="GitHub"
                                            onClick={() =>
                                                router.push(
                                                    "https://github.com/KasperGundersen"
                                                )
                                            }
                                            as={FaGithub}
                                        />
                                        <IconButton
                                            mx={3}
                                            bg="transparent"
                                            aria-label="GitHub"
                                            onClick={() =>
                                                router.push(
                                                    "https://www.linkedin.com/in/kaspergundersen/"
                                                )
                                            }
                                            as={FaLinkedin}
                                        />
                                    </Flex>
                                </Text>
                                <Text
                                    fontSize="lg"
                                    textAlign={checkSize ? "center" : "inherit"}
                                >
                                    Kasper ble oppvokst på en fransk vingård og
                                    er dermed gruppens vinkjeller. Er det noe
                                    han nyter, så er det en god flaske, og å
                                    skryte av den selvfølgelig. Kasper er kul og
                                    sånt, men vi kjenner han egt ikke så godt,
                                    fordi han heller forteller om Prez enn seg
                                    selv. Har du Kasper på snap anbefaler vi et
                                    besøk hos www.mentalhelse.no, her kan du få
                                    hjelp med traumer og PTSD etter å ha sett
                                    pepperoninippelen hans. Han kan kanskje slå
                                    deg som en pappagutt ved første blikk, men
                                    etter å ha bodd på asylmottaket har han
                                    blitt godt integrert. Likevel har han ikke
                                    lagt fra seg riking looken. Ikke en dag går
                                    forbi uten at han kler seg i penger. Dette
                                    er kanskje grunnen til an han fikk rollen
                                    som propagandaminister (han var forøvrig den
                                    eneste som stilte). Selv om han har et godt
                                    øye for damer, er det i realiteten bare en
                                    kvinne som er god nok for Kasper.
                                    @monatullah
                                </Text>
                            </Flex>
                            <Image
                                size="300px"
                                objectFit="cover"
                                src="/kasper.jpeg"
                                alt="Kasper Gundersen"
                            />
                        </Flex>
                    </Stack>
                </Flex>
            </Wrapper>
        </>
    );
};

export default withApollo({ ssr: true })(Index);
