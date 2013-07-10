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

@implementation ctdLoginViewController

@synthesize loginButton = loginButton;


- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    self.navigationController.navigationBar.tintColor = [UIColor blackColor];
    self.title = @"Login";
    
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    
    //[self updateView];
    
    ctdAppDelegate *appDelegate = [[UIApplication sharedApplication]delegate];
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
                [self goToWelcome];
            }];
        }
    }
    // Do any additional setup after loading the view from its nib.
}

-(void)viewWillAppear:(BOOL)animated{
    [self.navigationController setNavigationBarHidden:YES animated:YES];
}

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
            NSLog(@"SESSION TOKEN == %@",appDelegate.session.accessTokenData.accessToken);
            
            //get User id and name
            [[[FBRequest alloc] initWithSession:appDelegate.session graphPath:@"me"] startWithCompletionHandler:
             ^(FBRequestConnection *connection,
               NSDictionary<FBGraphUser> *user,
               NSError *error) {
                 if (!error) {
                     NSLog(@"id %@", user.id);
                     NSLog(@"name %@", user.first_name);
                     [self goToWelcome];
                 }else {
                     [self showAlert:@"server error" :@"alert" :@"OK"];
                     NSLog(@"Error: %@",error);
                 }
             }];
        }];
    }
    
    
 
}


-(void)showAlert:(NSString *)messageText :(NSString *)titleText :(NSString *)buttonText{
    UIAlertView *message = [[UIAlertView alloc] initWithTitle:titleText
                                                      message:messageText
                                                     delegate:nil
                                            cancelButtonTitle:buttonText
                                            otherButtonTitles:nil];
    [message show];
}


-(void) goToWelcome{
    ctdSignInViewController *signInViewController = [[ctdSignInViewController alloc]initWithNibName:@"ctdSignInViewController" bundle:nil];
    [self.navigationController setNavigationBarHidden:YES animated:YES];
    [self.navigationController pushViewController:signInViewController animated:YES];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
