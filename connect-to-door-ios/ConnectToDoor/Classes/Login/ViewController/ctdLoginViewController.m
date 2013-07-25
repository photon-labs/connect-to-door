//
//  ctdLoginViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdLoginViewController.h"
#import "ctdSignInViewController.h"
#import "ctdAppDelegate.h"
#import "ctdLocalStorage.h"
#import "MBProgressHUD.h"

@implementation ctdLoginViewController

@synthesize loginButton = loginButton;


- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
        self.hasSignoutButton = NO;
        self.hasBackButton = NO;
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    self.navigationController.navigationBar.tintColor = [UIColor blackColor];
    self.title = @"Login";
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 0.5 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
        [self checkSessionFacebook];
    });
	 // Do any additional setup after loading the view from its nib.
}

- (void)checkSessionFacebook{
    ctdAppDelegate *appDelegate = [[UIApplication sharedApplication]delegate];
    NSLog(@"appDelegate.session.isOpen = %i", appDelegate.session.isOpen);
    if (!appDelegate.session.isOpen) {
        // create a fresh session object
        appDelegate.session = [[FBSession alloc] init];
        // if we don't have a cached token, a call to open here would cause UX for login to
        // occur; we don't want that to happen unless the user clicks the login button, and so
        // we check here to make sure we have a token before calling open
        if (appDelegate.session.state == FBSessionStateCreatedTokenLoaded) {
            // even though we had a cached token, we need to login to make the session usable
            [appDelegate.session openWithCompletionHandler:^(FBSession *session,
                                                             FBSessionState status,
                                                             NSError *error) {
                
                // we recurse here, in order to update buttons and labels
                [self goToSignInPage];
            }];
        }
    }
}

/*
 *aldi_p
 *
 *this method for action click button login facebook
 */
- (IBAction)didLoginButtonClicked:(id)sender{
    // get the app delegate so that we can access the session property
    ctdAppDelegate *appDelegate = [[UIApplication sharedApplication]delegate];
    
    // this button's job is to flip-flop the session from open to closed
    if (appDelegate.session.isOpen) {
        // if a user logs out explicitly, we delete any cached token information, and next
        // time they run the applicaiton they will be presented with log in UX again; most
        // users will simply close the app or switch away, without logging out; this will
        // cause the implicit cached-token login to occur on next launch of the application
        [appDelegate.session closeAndClearTokenInformation];
        
    } else {
        if (appDelegate.session.state != FBSessionStateCreated) {
            // Create a new, logged out session.
            appDelegate.session = [[FBSession alloc] init];
        }
        
        // if the session isn't open, let's open it now and present the login UX to the user
        [appDelegate.session openWithCompletionHandler:^(FBSession *session,
                                                         FBSessionState status,
                                                         NSError *error) {
            // and here we make sure to update our UX according to the new session state
            
            [self showActivityIndicator];
            //get User id and name
            [[[FBRequest alloc] initWithSession:appDelegate.session graphPath:@"me"] startWithCompletionHandler:
             ^(FBRequestConnection *connection,
               NSDictionary<FBGraphUser> *user,
               NSError *error) {
                 [self hideActivityIndicator];
                 if (!error) {
                     NSString *fullName = [NSString stringWithFormat:@"%@ %@", user.first_name, user.last_name];
                     NSLog(@"id %@", user.id);
                     NSLog(@"name %@", fullName);
                     [self saveLocalStoreValue:fullName :user.id];
                     [self goToSignInPage];
                 }else {
                     [self showAlert:kAlertForException];
                     NSLog(@"Error: %@",error);
                 }
             }];
        }];
    }
    
    
    
}

/*
 *aldi_p
 *this method save value to lacal storage
 */
-(void)saveLocalStoreValue:(NSString*)nameUserFacebook : (NSString*)userFacebookId{
    ctdLocalStorage *localStorage = [[ctdLocalStorage alloc] init];
    [localStorage setNameUserFacebook:nameUserFacebook];
    [localStorage setUserFacebookId:userFacebookId];
}

/*
 *aldi_p
 *this method for show page enter employee id
 */
- (void)goToSignInPage{
    ctdSignInViewController *signInViewController = [[ctdSignInViewController alloc]initWithNibName:@"ctdSignInViewController" bundle:nil];
    [self.navigationController pushViewController:signInViewController animated:YES];
    [self removeFromParentViewController];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
