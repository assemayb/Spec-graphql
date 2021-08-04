import { Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import {
  IsUserLoggedInDocument,
  IsUserLoggedInQuery,
  useLogoutMutation,
} from "../generated/graphql";
import { ProfileButtonProps } from "../smallComps/ProfileBtn";

interface LogoutButtonProps extends ProfileButtonProps {}
export const LogoutButton: React.FC<LogoutButtonProps> = ({ isUserLogged }) => {
  const [logoutUser] = useLogoutMutation();
  const history = useHistory();
  const [screenWidth, setScreenWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    if (isUserLogged) {
      setAccessToken("");
      await logoutUser({
        update: async (cache, _) => {
          cache.writeQuery<IsUserLoggedInQuery>({
            query: IsUserLoggedInDocument,
            data: {
              isUserLoggedIn: false,
            },
          });
        },
      });
      history.push("/");
    }
  };

  return (
    <Button
      onClick={() => handleLogout()}
      height={["30%", "30%", "50%", "50%"]}
      fontSize={["sm", "sm", "medium", "medium"]}
      fontWeight="bold"
      bgColor="green.400"
      borderRadius="-10px"
      _hover={{
        bgColor: "green.500",
      }}
      mx="0.4rem"
    >
      {screenWidth > 800 ? <Text>Logout</Text> : <BiLogOut size="20px" />}
    </Button>
  );
};
