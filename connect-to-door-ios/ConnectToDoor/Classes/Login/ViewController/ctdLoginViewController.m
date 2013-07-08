//
//  ctdLoginViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdLoginViewController.h"
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
    NSString *status = [self checkUseranmeAndPassword:un :pass];
    if([status isEqual: @""]){
        [self goToWelcome];
    }else{
        [self showAlert:status :@"Alert" :@"OK"];
    }
}


-(NSString *)checkUseranmeAndPassword:(NSString *)userName :(NSString *)passWord {
    NSString *message = @"";
    if([userName length] == 0 && [passWord length] == 0){
        message = @"Please fill field Username and Password";
    }else if ([userName length] == 0){
        message = @"Please fill field Username";
    }else if ([passWord length] == 0){
        message = @"Please fill field Password";
    }
    else{
       
    }
    return message;
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
