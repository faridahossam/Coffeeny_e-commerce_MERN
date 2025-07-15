import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../context/Auth/AuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useCart } from "../context/Cart/CartContext";
import CoffeeIcon from "@mui/icons-material/Coffee";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import menuImage from "../images/istockphoto-1192341556-612x612.jpg";
function NavBar() {
  const { cartItems } = useCart();
  const { username, isAuthenticated, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMyOrders = () => {
    handleCloseUserMenu();
    navigate("/my-orders");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleCloseUserMenu();
  };

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#3E2723", height: "80px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Left side - Logo and Navigation */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Button
                variant="text"
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  padding: "8px 12px",
                  borderRadius: "8px",
                }}
                onClick={() => navigate("/")}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CoffeeIcon sx={{ fontSize: "2rem" }} />
                  <Typography
                    variant="h4"
                    noWrap
                    component="span"
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      letterSpacing: "1px",
                    }}
                  >
                    Coffeeny
                  </Typography>
                </Box>
              </Button>

              {/* Navigation Links */}
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                <Button
                  onClick={() => navigate("/")}
                  sx={{
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: 18,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Home
                </Button>
                <Button
                  onClick={handleOpenMenu}
                  sx={{
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: 18,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Menu
                </Button>
              </Box>
            </Box>

            {/* Right side - Cart and Auth */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, md: 3 },
              }}
            >
              <Tooltip title="View Cart">
                <IconButton
                  aria-label="cart"
                  onClick={handleCart}
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                    padding: "8px",
                  }}
                >
                  <Badge
                    badgeContent={cartItems.length}
                    // color="secondary"
                    sx={{
                      "& .MuiBadge-badge": {
                        right: -3,
                        top: 5,
                        border: `2px solid #3E2723`,
                        padding: "0 4px",
                        backgroundColor: "#D7CCC8",
                        color: "#3E2723",
                      },
                    }}
                  >
                    <ShoppingCart sx={{ fontSize: "1.8rem" }} />
                  </Badge>
                </IconButton>
              </Tooltip>

              {isAuthenticated ? (
                <>
                  <Tooltip title="Account settings">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.1)",
                        },
                      }}
                      onClick={handleOpenUserMenu}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        {username}
                      </Typography>
                      <Avatar
                        alt={username || ""}
                        src="/static/images/avatar/2.jpg"
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: "#D7CCC8",
                          color: "#3E2723",
                          fontWeight: "bold",
                        }}
                      />
                    </Box>
                  </Tooltip>

                  <Menu
                    sx={{
                      mt: "45px",
                      "& .MuiPaper-root": {
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        borderRadius: 2,
                        minWidth: "200px",
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={handleMyOrders}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#F5F0E8",
                        },
                        py: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#3E2723",
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        My Orders
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#F5F0E8",
                        },
                        py: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#3E2723",
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleLogin}
                    sx={{
                      color: "#fff",
                      borderColor: "rgba(255,255,255,0.5)",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderColor: "#fff",
                      },
                      px: 3,
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleRegister}
                    sx={{
                      backgroundColor: "#D7CCC8",
                      color: "#3E2723",
                      "&:hover": {
                        backgroundColor: "#BCAAA4",
                      },
                      px: 3,
                      fontWeight: 600,
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* Menu Dialog */}
      <Dialog open={menuOpen} onClose={handleCloseMenu} maxWidth="md" fullWidth>
        <DialogContent sx={{ backgroundColor: "#FFFFFF" }}>
          <Box sx={{ textAlign: "center", p: 4 }}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4" sx={{ color: "#3E2723" }}>
                Our Menu
              </Typography>
              <Button
                onClick={handleCloseMenu}
                variant="contained"
                sx={{
                  // mt: 4,
                  backgroundColor: "#3E2723",
                  "&:hover": {
                    backgroundColor: "#5D4037",
                  },
                }}
              >
                X
              </Button>
            </Box>

            <img
              src={menuImage}
              alt="Coffee Menu"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                marginTop: 4,
              }}
            />
            <Button
              onClick={handleCloseMenu}
              variant="contained"
              sx={{
                mt: 4,
                backgroundColor: "#3E2723",
                "&:hover": {
                  backgroundColor: "#5D4037",
                },
              }}
            >
              Close Menu
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}

export default NavBar;
