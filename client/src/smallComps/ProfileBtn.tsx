import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { ModalComponent } from "../components/Modal";

export interface ProfileButtonProps {
  isUserLogged: boolean;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  isUserLogged,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { onClose } = useDisclosure({
    onClose: () => setShowModal(false),
  });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const router = useHistory();
  const handleProfileClick = () => {
    if (isUserLogged === true) {
      router.push("/profile");
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <ModalComponent showModal={showModal} onClose={onClose} />
      <Button
        id="profile-btn"
        onClick={() => handleProfileClick()}
        height={["30%", "30%", "50%", "50%"]}
        fontSize={["sm", "sm", "medium", "medium"]}
        fontWeight="bold"
        bgColor="green.400"
        borderRadius="-10px"
        _hover={{
          bgColor: "green.500",
        }}
        mx={{
          base: "0.2rem",
          md: "0.4rem",
        }}
      >
        <AiOutlineUser size="20px" />
        {screenWidth > 800 && <Box marginLeft="4px">profile</Box>}
      </Button>
    </>
  );
};
