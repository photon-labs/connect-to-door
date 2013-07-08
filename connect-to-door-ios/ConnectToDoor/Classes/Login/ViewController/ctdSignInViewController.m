//
//  ctdSignInViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdSignInViewController.h"
#import "ctdWelcomeViewController.h"
#import "ctdLoginService.h"

@interface ctdSignInViewController ()

@end

@implementation ctdSignInViewController

@synthesize employeeID = employeeID;
@synthesize continueButton = continueButton;

NSString *test;

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
    // Do any additional setup after loading the view from its nib.
}

-(void)viewWillAppear:(BOOL)animated{
    [self.navigationController setNavigationBarHidden:YES animated:YES];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)didContinueClicked:(id)sender{
    NSString *employeeIDText = self.employeeID.text;
    [self checkEmployeeID:employeeIDText];
}


-(void)checkEmployeeID:(NSString *)employeeID{
    if([employeeID length] > 0){
        [self goToWelcome];
    }else{
        UIAlertView *message = [[UIAlertView alloc] initWithTitle:@"Alert!"
                                                          message:@"Please input Employee ID."
                                                         delegate:nil
                                                cancelButtonTitle:@"OK"
                                                otherButtonTitles:nil];
        [message show];
    }
}

-(void)goToWelcome {
    ctdLoginService *loginService = [[ctdLoginService alloc]init];
    loginService.delegate = self;
    NSString *employeeId= employeeID.text;
    [loginService loginToServer:employeeId facebookID:@"100001687854142"];
    ctdWelcomeViewController *welcomeViewController = [[ctdWelcomeViewController alloc]initWithNibName:@"ctdWelcomeViewController" bundle:nil];
    [self.navigationController pushViewController:welcomeViewController animated:YES];
}


#pragma login Service Delegate
-(void)didReceivedLoginResponse:(NSString *)response{
    
}

-(void)didReceiveLoginErrorResponse:(NSError *)error{
    
}

@end
