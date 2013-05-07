//
//  ctdSignInViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdSignInViewController.h"
#import "ctdWelcomeViewController.h"

@interface ctdSignInViewController ()

@end

@implementation ctdSignInViewController

@synthesize employeeID = employeeID;
@synthesize continueButton = continueButton;

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
    if(employeeID.length > 0){
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
    ctdWelcomeViewController *welcomeViewController = [[ctdWelcomeViewController alloc]initWithNibName:@"ctdWelcomeViewController" bundle:nil];
    [self.navigationController setNavigationBarHidden:YES animated:YES];
    [self.navigationController pushViewController:welcomeViewController animated:YES];
}

@end
