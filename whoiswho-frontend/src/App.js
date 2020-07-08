import React from 'react';
import {TopNav} from './shared/navigation/TopNav';
import {theme} from './shared/theme';
import {ThemeProvider} from 'emotion-theming';
import {BrowserRouter as Router, NavLink, Redirect, Route} from 'react-router-dom';
import {Switch} from 'react-router';
import {Main} from './shared/layout/Main';
import {PersonListPage} from './people/PersonListPage';
import {useClient} from './ApiClient';
import {ApolloProvider} from 'react-apollo';
import {GlobalStyles} from './shared/GlobalStyles';
import {StudyMaterialListPage} from './study-material/StudyMaterialListPage';
import {AnonymousRoute, AuthenticatedRoute} from './authentication/AuthenticatedRoute';
import {LoginPage} from './authentication/LoginPage';
import {SignupPage} from './authentication/SignupPage';
import {PersonDetailPage} from './people/PersonDetailPage';
import {CreateStudyMaterialPage} from './study-material/CreateStudyMaterialPage';
import {StudyMaterialDetailPage} from './study-material/StudyMaterialDetailPage';
import {CreateStudyMaterialReviewPage} from './study-material/CreateStudyMaterialReviewPage';
import {TeamListPage} from './team/TeamListPage';
import {TeamDetailPage} from './team/TeamDetailPage';
import {CreateTeamPage} from './team/CreateTeamPage';
import {HiscoreTypeChooserPage} from './hiscores/HiscoreTypeChooserPage';
import {PeopleHiscoresPage} from './hiscores/PeopleHiscoresPage';
import {TeamHiscoresPage} from './hiscores/TeamHiscoresPage';
import {EditProfilePage} from './profile/EditProfilePage';
import {EditPasswordPage} from './authentication/EditPasswordPage';
import {EditAvatarPage} from './profile/EditAvatarPage';

function App() {
  const [client] = useClient();
  return (
    <div>
      <ThemeProvider theme={theme}>
      <GlobalStyles/>
        {client != null && <ApolloProvider client={client}>
          <Router>
            <TopNav name="Whoiswho">
              <NavLink to="/people">People</NavLink>
              <NavLink to="/material">Study material</NavLink>
              <NavLink to="/teams">Teams</NavLink>
              <NavLink to="/hiscores">Hiscores</NavLink>
            </TopNav>
            <Main>
              <Switch>
                <AuthenticatedRoute path="/profile/edit" exact component={EditProfilePage}/>
                <AuthenticatedRoute path="/profile/password/edit" exact component={EditPasswordPage}/>
                <AuthenticatedRoute path="/profile/avatar/edit" exact component={EditAvatarPage}/>
                <Route path="/people/:id" exact component={PersonDetailPage}/>
                <Route path="/people" exact component={PersonListPage}/>
                <AuthenticatedRoute path="/material/create" exact component={CreateStudyMaterialPage}/>
                <AuthenticatedRoute path="/material/:id/review/create" exact component={CreateStudyMaterialReviewPage}/>
                <Route path="/material/:id" exact component={StudyMaterialDetailPage}/>
                <Route path="/material" exact component={StudyMaterialListPage}/>
                <AuthenticatedRoute path="/teams/create" exact component={CreateTeamPage}/>
                <Route path="/teams/:id" exact component={TeamDetailPage}/>
                <Route path="/teams" exact component={TeamListPage}/>
                <Route path="/hiscores/people/:skill" exact component={PeopleHiscoresPage}/>
                <Route path="/hiscores/teams/:skill" exact component={TeamHiscoresPage}/>
                <Route path="/hiscores" exact component={HiscoreTypeChooserPage}/>
                <AnonymousRoute path="/login" exact component={LoginPage}/>
                <AnonymousRoute path="/signup" exact component={SignupPage}/>
                <Redirect to="/people"/>
              </Switch>
            </Main>
          </Router>
        </ApolloProvider>}
      </ThemeProvider>
    </div>
  );
}

export default App;
