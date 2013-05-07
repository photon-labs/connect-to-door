//
//  ctdLoginViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdLoginViewController.h"
#import "MBProgressHUD.h"
#import "ctdSignInViewController.h"

@implementation ctdLoginViewController

@synthesize loginButton = loginButton;
@synthesize password = password;
@synthesize userName = username;

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
    // Do any additional setup after loading the view from its nib.
}

-(void)viewWillAppear:(BOOL)animated{
    [self.navigationController setNavigationBarHidden:YES animated:YES];
}

- (IBAction)didLoginButtonClicked:(id)sender{
    NSString *un = self.userName.text;
    NSString *pass = self.password.text;
    [self checkUseranmeAndPassword:un :pass];
}


-(void) checkUseranmeAndPassword:(NSString *)userName :(NSString *)passWord {
    if(userName.length > 0 && passWord.length > 0){
       [self goToWelcome];
    }else{
        UIAlertView *message = [[UIAlertView alloc] initWithTitle:@"Alert!"
                                                          message:@"Please input username and password."
                                                         delegate:nil
                                                cancelButtonTitle:@"OK"
                                                otherButtonTitles:nil];
        [message show];
    }
}


-(void)showAlert:(NSString *)message {
    
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

- (void)showActivityIndicator {
	MBProgressHUD  *hud = [MBProgressHUD showHUDAddedTo:self.view animated:YES];
    //hud.layer.Position = 1;
	hud.mode = MBProgressHUDModeIndeterminate;
}

- (void)hideActivityIndicator {
	[MBProgressHUD hideHUDForView:self.view animated:YES];
}

@end
