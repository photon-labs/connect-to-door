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
#import "ctdLocalStorage.h"
#import "ctdLoginParser.h"
#import "ctdReponseLoginModel.h"

@interface ctdSignInViewController ()

@end

@implementation ctdSignInViewController

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
    self.hasSignoutButton = YES;
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
    [self hideKeyboard];
    NSString *employeeIDText = employeeID.text;
    [self checkEmployeeID:employeeIDText];
}


-(void)checkEmployeeID:(NSString *)employeeId{
    if([employeeId length] > 0){
        ctdLoginService *loginService = [[ctdLoginService alloc]init];
        loginService.delegate = self;
        //NSString *employeeId= employeeId;
        [self saveEmployeeIdtoLocalStorage:employeeId];
        NSLog(@"EMPLOYEE ID == %@",employeeId);
        NSLog(@"FACEBOOK ID == %@",[self getFacebookId]);
        [loginService loginToServer:employeeId facebookID:[self getFacebookId]];
    }else{
        [self showAlert:kAlertEmptyFieldEmployeeId];
    }
}

// Close keyboard if the Background is touched
- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
	[self.view endEditing:YES];
	[super touchesBegan:touches withEvent:event];
	[self hideKeyboard];
}

- (void)hideKeyboard{
    [employeeID resignFirstResponder];
}

-(NSString*)getFacebookId{
    ctdLocalStorage *localStorage = [[ctdLocalStorage alloc]init];
    NSString* facebookId = [localStorage getUserFacebookId];
    return facebookId;
}


-(void) saveEmployeeIdtoLocalStorage:(NSString*)employeeId{
    ctdLocalStorage *localStorage = [[ctdLocalStorage alloc]init];
    [localStorage setEmployeeId:employeeId];
}

-(void)goToWelcome {
    ctdWelcomeViewController *welcomeViewController = [[ctdWelcomeViewController alloc]initWithNibName:@"ctdWelcomeViewController" bundle:nil];
    [self.navigationController pushViewController:welcomeViewController animated:YES];
    [self removeFromParentViewController];
}


#pragma login Service Delegate
-(void)didReceivedLoginResponse:(NSString *)response{
    ctdLoginParser *parse = [[ctdLoginParser alloc]init];
    ctdReponseLoginModel *model = [parse parseResponse:response];
    if([model.message isEqualToString:@"Login failed"]){
        [self showAlert:kAlertInvalidEmployeeId];
    }else{
        [self goToWelcome];
    }
}

-(void)didReceiveLoginErrorResponse:(NSError *)error{
    // error response
}

@end
