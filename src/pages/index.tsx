import { Wrapper } from "../components/Wrapper";
import { Navbar } from "../components/Navbar";
import { withApollo } from "../utils/withApollo";
import React from "react";
import { Flex, Image, Stack, Text } from "@chakra-ui/core";
import useWindowSize from "../utils/useWindowSize";

const Index = () => {
    const size = useWindowSize();

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
                            direction={
                                size.width < 700 ? "column-reverse" : "row"
                            }
                        >
                            <Flex direction="column" m={5}>
                                <Text
                                    fontSize="5xl"
                                    textAlign={
                                        size.width < 700 ? "center" : "inherit"
                                    }
                                >
                                    Emir Derouche
                                </Text>
                                <Text
                                    textAlign={
                                        size.width < 700 ? "center" : "inherit"
                                    }
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
                                size.width < 700
                                    ? "column-reverse"
                                    : "row-reverse"
                            }
                            justify="space-between"
                            align="center"
                        >
                            <Flex direction="column" m={5}>
                                <Text
                                    fontSize="5xl"
                                    textAlign={
                                        size.width < 700 ? "center" : "inherit"
                                    }
                                >
                                    Nikolai Dokken
                                </Text>
                                <Text
                                    fontSize="lg"
                                    textAlign={
                                        size.width < 700 ? "center" : "inherit"
                                    }
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
                            direction={
                                size.width < 700 ? "column-reverse" : "row"
                            }
                        >
                            <Flex direction="column" m={5}>
                                <Text
                                    fontSize="5xl"
                                    textAlign={
                                        size.width < 700 ? "center" : "inherit"
                                    }
                                >
                                    Ian Evangelista
                                </Text>
                                <Text
                                    fontSize="lg"
                                    textAlign={
                                        size.width < 700 ? "center" : "inherit"
                                    }
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
                                size.width < 700
                                    ? "column-reverse"
                                    : "row-reverse"
                            }
                            justify="space-between"
                            align="center"
                        >
                            <Flex direction="column" m={5}>
                                <Text
                                    fontSize="5xl"
                                    textAlign={
                                        size.width < 700 ? "center" : "inherit"
                                    }
                                >
                                    Kasper Gundersen
                                </Text>
                                <Text
                                    fontSize="lg"
                                    textAlign={
                                        size.width < 700 ? "center" : "inherit"
                                    }
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
