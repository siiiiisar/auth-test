import { Header } from "./Header"
import { Grid, Container } from "@mui/material"

export const CommonLayout = (props) => {
  const { children } = props;
  return(
    <>
      <header>
        <Header/>
      </header>
      <main>
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="center">
            <Grid item>
              {children}
            </Grid>   
          </Grid>
        </Container>
      </main>
    </>
  )
}