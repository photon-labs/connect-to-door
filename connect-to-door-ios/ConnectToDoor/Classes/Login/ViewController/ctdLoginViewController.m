//
//  ctdLoginViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdLoginViewController.h"
#import "MBProgressHUD.h"
#import "ctdWelcomeViewController.h"

@implementation ctdLoginViewController

@synthesize loginButton = _loginButton;
@synthesize password = _password;
@synthesize userName = _username;

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

- (IBAction)didLoginButtonClicked:(id)sender{
     [self showActivityIndicator];
    [self goToWelcome];
    [self hideActivityIndicator];
}


-(void) goToWelcome{
    sleep(3);

    ctdWelcomeViewController *welcomeViewController = [[ctdWelcomeViewController alloc]initWithNibName:@"ctdWelcomeViewController" bundle:nil];
    [self.navigationController pushViewController:welcomeViewController animated:YES];
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
